import * as React from 'react'
import { KlaviyoFormWrapper } from './styled'

interface KlaviyoFormProps {
  formId: string
}

export const KlaviyoForm = ({ formId }: KlaviyoFormProps) => {
  return (
    <KlaviyoFormWrapper>
      <div className={formId} />
    </KlaviyoFormWrapper>
  )
}
