import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import moment from 'moment'

import { TextField } from '@mui/material'

import CustomForm from 'generics/components/CustomForm'

import useForm from 'generics/hooks/useForm'

import {
  putMobileWorkshop,
  postMobileWorkshop
} from 'store/mobileWorkshopsSlice'

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
      initFormFields({
        startTime: moment(entity.startDate).format('HH:mm'),
        endTime: moment(entity.endDate).format('HH:mm'),
        date: moment(entity.startDate).format('yyyy-MM-DD'),
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
    const startDate = `${date} ${startTime}`
    const endDate = `${date} ${endTime}`
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
        <TextField
          label="Début"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
        <TextField
          label="Fin"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
        <TextField
          label="Fin"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
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
