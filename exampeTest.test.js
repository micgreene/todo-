import {render, screen} from '@testing-library/react';
import App from './hooks/src/App.js';

test('can count', () => {
  render(<App />);
  const counterValue = screen.getByTestId('counter-value');
  const previousValue = parseInt(counterValue.textContent);
  
  const incrementButton = screen.getByTestId('counter-increment-button');  
  fireEvent.click(incrementButton);

  const currentValue = parseInt(counterValue.textContent);
  
  expect(currentValue - previousValue).toBe(1);
});