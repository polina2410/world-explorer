import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/UI/Modal/Modal';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

describe('Modal', () => {
  it('renders nothing when isOpen=false', () => {
    render(<Modal isOpen={false} onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen=true', () => {
    render(<Modal isOpen onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows default message', () => {
    render(<Modal isOpen onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('shows custom message', () => {
    render(
      <Modal isOpen message="Leave the quiz?" onConfirm={vi.fn()} onCancel={vi.fn()} />
    );
    expect(screen.getByText('Leave the quiz?')).toBeInTheDocument();
  });

  it('calls onConfirm when Yes is clicked', () => {
    const onConfirm = vi.fn();
    render(<Modal isOpen onConfirm={onConfirm} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByText('Yes'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when No is clicked', () => {
    const onCancel = vi.fn();
    render(<Modal isOpen onConfirm={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('No'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when overlay is clicked', () => {
    const onCancel = vi.fn();
    render(<Modal isOpen onConfirm={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onCancel).toHaveBeenCalled();
  });
});
