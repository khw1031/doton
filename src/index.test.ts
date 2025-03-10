import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { init, isValidCommand } from './index';

// Mock modules rather than individual chalk functions
vi.mock('chalk', () => ({
  default: {
    red: vi.fn((str) => `red:${str}`),
    yellow: vi.fn((str) => `yellow:${str}`),
    green: vi.fn((str) => `green:${str}`),
    blue: vi.fn((str) => `blue:${str}`),
    bold: vi.fn((str) => `bold:${str}`),
  },
}));

// Mock all other external dependencies
vi.mock('inquirer');
vi.mock('fs-extra');
vi.mock('path');
vi.mock('ora');

describe('isValidCommand function', () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('should return true for "init" command', () => {
    expect(isValidCommand('init')).toBe(true);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should return false for non-init commands', () => {
    expect(isValidCommand('invalid')).toBe(false);
    expect(console.log).toHaveBeenCalledTimes(2);
  });
});

describe('init function', () => {
  // Save original process.exit and console functions
  const originalExit = process.exit;
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Mock process.exit
    process.exit = vi.fn() as any;
    console.log = vi.fn();
    console.error = vi.fn();
    
    // Default path mock
    vi.mocked(path.resolve).mockImplementation((_, targetDir) => `/mock/path/${targetDir}`);
    vi.mocked(path.join).mockImplementation((...parts) => parts.join('/'));
  });

  afterEach(() => {
    // Restore original functions
    process.exit = originalExit;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  it('should initialize configuration successfully', async () => {
    // Mock inquirer responses
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ configType: 'cursor' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ targetDir: 'test-dir' });
    
    // Mock fs functions
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
    vi.mocked(fs.pathExists).mockResolvedValue(false as unknown as void);
    vi.mocked(fs.copy).mockResolvedValue(undefined);
    
    // Mock ora
    const spinnerMock = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
    };
    vi.mocked(ora).mockReturnValue(spinnerMock as any);
    
    // Call init function
    await init();
    
    // Verify all expected functions were called
    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(fs.ensureDir).toHaveBeenCalledWith('/mock/path/test-dir');
    expect(fs.pathExists).toHaveBeenCalled();
    expect(fs.copy).toHaveBeenCalled();
    expect(spinnerMock.start).toHaveBeenCalled();
    expect(spinnerMock.succeed).toHaveBeenCalled();
    expect(spinnerMock.fail).not.toHaveBeenCalled();
  });

  it('should fail if target directory already contains .cursor folder', async () => {
    // Mock inquirer responses
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ configType: 'cursor' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ targetDir: 'test-dir' });
    
    // Mock fs functions
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
    vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as void);
    
    // Mock ora
    const spinnerMock = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
    };
    vi.mocked(ora).mockReturnValue(spinnerMock as any);
    
    // Call init function
    await init();
    
    // Verify expected behavior
    expect(spinnerMock.fail).toHaveBeenCalled();
    expect(fs.copy).not.toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should handle fs operation errors', async () => {
    // Mock inquirer responses
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ configType: 'cursor' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ targetDir: 'test-dir' });
    
    // Mock fs functions
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
    vi.mocked(fs.pathExists).mockResolvedValue(false as unknown as void);
    vi.mocked(fs.copy).mockRejectedValue(new Error('Copy failed'));
    
    // Mock ora
    const spinnerMock = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
    };
    vi.mocked(ora).mockReturnValue(spinnerMock as any);
    
    // Call init function
    await init();
    
    // Verify expected behavior
    expect(spinnerMock.fail).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });
}); 
