import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import TitleBlockEditor from './TitleBlockEditor';

jest.mock('axios');

describe('TitleBlockEditor', () => {
  const titleBlock = {
    name: 'Test Title Block',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    alignment: 'left',
    show_divider: false
  };

  const onUpdate = jest.fn();

  it('renders the component correctly', () => {
    const { getByLabelText, getByText } = render(
      <TitleBlockEditor titleBlock={titleBlock} onUpdate={onUpdate} />
    );
    const titleInput = getByLabelText('Title');
    const subtitleInput = getByLabelText('Subtitle');
    const updateButton = getByText('Update');

    expect(titleInput.value).toBe(titleBlock.title);
    expect(subtitleInput.value).toBe(titleBlock.subtitle);
    expect(updateButton).toBeInTheDocument();
  });

  it('submits the form correctly and updates the title block', async () => {
    axios.patch.mockResolvedValue({
      data: {
        ...titleBlock,
        title: 'Updated Title',
        subtitle: 'Updated Subtitle'
      }
    });

    const { getByLabelText, getByText } = render(
      <TitleBlockEditor titleBlock={titleBlock} onUpdate={onUpdate} />
    );
    const titleInput = getByLabelText('Title');
    const subtitleInput = getByLabelText('Subtitle');
    const updateButton = getByText('Update');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(subtitleInput, { target: { value: 'Updated Subtitle' } });
    fireEvent.click(updateButton);

    await wait(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `http://localhost:8000/api/titleblock/${titleBlock.name}/`,
        expect.any(FormData),
        expect.any(Object)
      );
      expect(onUpdate).toHaveBeenCalledWith({
        ...titleBlock,
        title: 'Updated Title',
        subtitle: 'Updated Subtitle'
      });
    });
  });
});
