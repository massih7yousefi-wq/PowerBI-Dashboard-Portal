import axios from 'axios';

interface ValidationErrorResponse {
  errors?: Record<string, string[]>;
  detail?: string;
  title?: string;
  message?: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const status = error.response?.status;
  const data = error.response?.data as ValidationErrorResponse | undefined;

  if (status === 401) {
    return data?.message ?? 'Your session is invalid or has expired.';
  }

  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (status === 404) {
    return data?.detail ?? 'The requested resource was not found.';
  }

  if (status === 400) {
    if (data?.errors) {
      const messages = Object.values(data.errors).flat();

      if (messages.length > 0) {
        return messages.join(' ');
      }
    }

    return data?.detail ?? data?.message ?? 'Please check the submitted data.';
  }

  if (status === 500) {
    return 'The server encountered an error. Please try again later.';
  }

  if (!error.response) {
    return 'Unable to connect to the server. Check your internet connection.';
  }

  return data?.detail ?? data?.message ?? fallback;
}