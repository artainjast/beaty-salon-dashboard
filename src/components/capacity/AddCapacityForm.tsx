import { useState } from 'react';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import TextField from '../cubes/TextField';
import axiosFetch from '@/api/axios';

const AddCapacityForm = () => {
  const [date, setDate] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [slots, setSlots] = useState('');

  const handleDateChange = (date) => {   
    console.log();
     const unixDate = Date.parse(date) / 1000 
    setDate(unixDate);
  };
  const handleStartTimeChange = (time) => {
    setStartTime(Date.parse(time) / 1000)
  }
  const handleEndTimeChange = (time) => {
    setEndTime(Date.parse(time) / 1000)
  }
  const handleSlot = (slot) => {
    setSlots(slot)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axiosFetch.post('/capacity', {
        date:date, // Convert date to Unix timestamp
          startTime: startTime , // Convert start time to Unix timestamp
          endTime: endTime, // Convert end time to Unix timestamp
          slots: parseInt(slots)
      }).then((res) => console.log(res)
      )
      const response = await fetch('/capacity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date:date, // Convert date to Unix timestamp
          startTime: startTime , // Convert start time to Unix timestamp
          endTime: endTime, // Convert end time to Unix timestamp
          slots: parseInt(slots), // Convert slots to integer
        }),
      });

      const data = await response.json();
      console.log(data); // Success message or error message
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
  
    <form className='p-4 bg-slate-500 ' onSubmit={handleSubmit}>
      <div className='flex flex-row items-center justify-center'>
        <label htmlFor="date">تاریخ:</label>
        <DatePicker label="Small picker"
                    slotProps={{ textField: { size: 'small' } }} 
                    className='bg-slate-500 w-full' onChange={handleDateChange} disablePast/>
      </div>
      <div>
        <label htmlFor="start_time">ساعت شروع</label>
        <TimePicker  slotProps={{ textField: { size: 'small' } , previousIconButton : {
          value : 'قبل'
        } , actionBar : {
          dir:'ltr'
        } , leftArrowIcon : {
          display: 'none'
        }}}  onChange={handleStartTimeChange} />
      </div>
      <div>
        <label htmlFor="end_time">ساعت پایان:</label>
        <TimePicker  slotProps={{ textField: { size: 'small' }}} 
         onChange={handleEndTimeChange} />
      </div>
      <div>
        <label htmlFor="slots">تعداد قابل پذیرش:</label>
        <TextField name='capacity' type='number' onChange={handleSlot} placeholder='1 عدد'></TextField>
      </div>
        <p>افزودن ظرفیت</p>
      <button type="submit" className='bg-green-500 p-2 w-full rounded'>افزودن ظرفیت</button>
    </form>
    </LocalizationProvider>
  );
};

export default AddCapacityForm;
