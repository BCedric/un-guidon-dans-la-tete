import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import moment from 'moment'
import MomentUtils from '@date-io/moment'

import { TextField } from '@material-ui/core'

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import CustomForm from 'generics/components/CustomForm'

import useForm from 'generics/hooks/useForm'

import {
  putMobileWorkshop,
  postMobileWorkshop
} from 'store/pages/mobileWorkshopsSlice'

const MobileWorkshopsForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormValid } = useForm()
  const [date, setDate] = getFormField('date', moment(), true)
  const [startTime, setStartTime] = getFormField('startTime', moment(), true)
  const [endTime, setEndTime] = getFormField('endTime', moment(), true)
  const [place, setPlace] = getFormField('place', '', true)
  const [event, setevent] = getFormField('event', '')

  const dispatch = useDispatch()

  useEffect(() => {
    if (entity != null) {
      console.log(entity)
      initFormFields({
        startTime: moment(entity.startDate),
        endTime: moment(entity.endDate),
        date: moment(entity.startDate),
        place: entity.place,
        event: entity.eventName
      })
    } else {
      initFormFields({
        startTime: moment(),
        endTime: moment(),
        date: moment(),
        place: '',
        event: ''
      })
    }
  }, [entity])

  const submit = () => {
    console.log(
      date.format('DD/MM/yyyy'),
      startTime.format('HH:mm'),
      endTime.format('HH:mm'),
      place,
      event
    )
    const dateFormatted = date.format('yyyy-MM-DD')
    const startDate = `${dateFormatted} ${startTime.format('HH:mm')}`
    const endDate = `${dateFormatted} ${endTime.format('HH:mm')}`
    if (entity != null) {
      return putMobileWorkshop(
        entity.id,
        { startDate, endDate, place, event },
        dispatch
      )
    }

    return postMobileWorkshop({ startDate, endDate, place, event }, dispatch)
  }
  return (
    <CustomForm onSubmit={submit} onCancel={cancel} isFormValid={isFormValid}>
      <div className="form-line">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={date}
            onChange={setDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Début"
            format="HH:mm"
            value={startTime}
            onChange={setStartTime}
            ampm={false}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Fin"
            format="HH:mm"
            value={endTime}
            onChange={setEndTime}
            ampm={false}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="form-line">
        <TextField
          value={place}
          label="Lieu"
          onChange={(e) => setPlace(e.target.value)}
          className="form-control"
          id="label-input"
          type="text"
        ></TextField>
        <TextField
          value={event}
          label="Evènement"
          onChange={(e) => setevent(e.target.value)}
          className="form-control"
          id="label-input"
          type="text"
        ></TextField>
      </div>
    </CustomForm>
  )
}

export default MobileWorkshopsForm
