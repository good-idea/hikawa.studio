import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Heading } from '../Text'
import { TextArea } from '../Forms'

const NoteWrapper = styled.div`
  flex-wrap: wrap;
  flex-direction: column;
  display: block;
  justify-content: flex-start;

  textarea {
    min-width: 300px;
    display: block;
    margin-bottom: 8px;
  }
`

type NoteInputProps = {
  noteInputValue: string
  setNoteInputValue: (value: string) => void
}

export const NoteInput = ({
  noteInputValue,
  setNoteInputValue,
}: NoteInputProps) => {
  const handleChange = (e) => {
    setNoteInputValue(e.target.value)
  }

  return (
    <NoteWrapper>
      <Heading textAlign="left" flexBasis={1} level={5}>
        Order Notes
      </Heading>
      <TextArea onChange={handleChange} value={noteInputValue} />
    </NoteWrapper>
  )
}
