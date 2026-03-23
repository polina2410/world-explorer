import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FeedbackModal from '@/components/UI/FeedbackModal/FeedbackModal';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const mockSubmitFeedback = vi.fn();
vi.mock('@/actions/submitFeedback', () => ({
  submitFeedback: (...args: unknown[]) => mockSubmitFeedback(...args),
}));

function renderModal(isOpen = true, onClose = vi.fn()) {
  return render(<FeedbackModal isOpen={isOpen} onClose={onClose} />);
}

describe('FeedbackModal', () => {
  beforeEach(() => {
    mockSubmitFeedback.mockReset();
  });

  it('renders nothing when isOpen=false', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the form when isOpen=true', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('Send button is disabled when email and message are empty', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('Send button is disabled when only email is filled', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('Send button is disabled when only message is filled', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hello' } });
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('Send button is enabled when both email and message are filled', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hello' } });
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled();
  });

  it('shows success state after successful submission', async () => {
    mockSubmitFeedback.mockResolvedValue({ success: true });
    renderModal();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Great app!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() =>
      expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument()
    );
  });

  it('calls submitFeedback with correct values', async () => {
    mockSubmitFeedback.mockResolvedValue({ success: true });
    renderModal();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Nice!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() => expect(mockSubmitFeedback).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Nice!',
    }));
  });

  it('shows error message on failed submission', async () => {
    mockSubmitFeedback.mockResolvedValue({ success: false, error: 'Failed to save feedback. Please try again.' });
    renderModal();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() =>
      expect(screen.getByText('Failed to save feedback. Please try again.')).toBeInTheDocument()
    );
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on overlay click when email is filled', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close on overlay click when message is filled', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hello' } });
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on overlay click when both fields are empty', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});