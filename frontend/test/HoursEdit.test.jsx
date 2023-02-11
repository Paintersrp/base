import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import EditHours from './EditHours';

jest.mock('axios');

const initialData = {
  monday: '9am-5pm',
  tuesday: '9am-5pm',
  wednesday: '9am-5pm',
  thursday: '9am-5pm',
  friday: '9am-5pm',
  saturday: 'Closed',
  sunday: 'Closed',
};

const updatedData = {
  monday: '10am-6pm',
  tuesday: '10am-6pm',
  wednesday: '10am-6pm',
  thursday: '10am-6pm',
  friday: '10am-6pm',
  saturday: '10am-2pm',
  sunday: '10am-2pm',
};

describe('EditHours', () => {
  it('renders the correct form fields with initial values', () => {
    const { getByLabelText } = render(
      <EditHours initialData={initialData} onUpdate={jest.fn()} />
    );

    const mondayField = getByLabelText('Monday');
    const tuesdayField = getByLabelText('Tuesday');
    const wednesdayField = getByLabelText('Wednesday');
    const thursdayField = getByLabelText('Thursday');
    const fridayField = getByLabelText('Friday');
    const saturdayField = getByLabelText('Saturday');
    const sundayField = getByLabelText('Sunday');

    expect(mondayField.value).toBe(initialData.monday);
    expect(tuesdayField.value).toBe(initialData.tuesday);
    expect(wednesdayField.value).toBe(initialData.wednesday);
    expect(thursdayField.value).toBe(initialData.thursday);
    expect(fridayField.value).toBe(initialData.friday);
    expect(saturdayField.value).toBe(initialData.saturday);
    expect(sundayField.value).toBe(initialData.sunday);
  });

  it('updates the form fields and submits the updated values', async () => {
    axios.patch.mockResolvedValue({ data: updatedData });
    axios.get.mockResolvedValue({ data: updatedData });

    const onUpdate = jest.fn();

    const { getByLabelText, getByText } = render(
      <EditHours initialData={initialData} onUpdate={onUpdate} />
    );

    const mondayField = getByLabelText('Monday');
    const tuesdayField = getByLabelText('Tuesday');
    const wednesdayField = getByLabelText('Wednesday');
    const thursdayField = getByLabelText('Thursday');
    const fridayField = getByLabelText('Friday');
    const saturdayField = getByLabelText('Saturday');
    const sundayField = getByLabelText('Sunday');

    fireEvent.change(mondayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(tuesdayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(wednesdayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(thursdayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(fridayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(saturdayField, { target: { value: '9am - 5pm' } });
    fireEvent.change(sundayField, { target: { value: '9am - 5pm' } });
    
    const submitButton = getByText('Update');
fireEvent.click(submitButton);

await wait(() => {
  expect(axios.patch).toHaveBeenCalledWith(
    'http://localhost:8000/api/contact/',
    updatedData,
    {
      headers: {
        Authorization: 'JWT undefined',
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/contact/');
  expect(onUpdate).toHaveBeenCalledWith(updatedData);
});
});
});
