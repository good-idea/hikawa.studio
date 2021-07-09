import * as React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Box } from '@xstyled/styled-components'
import { AccordionBlock } from '../../types'
import {
  AccordionWrapper,
  AccordionInner,
  AccordionButton,
  AccordionIcon,
} from './styled'
import { Heading } from '../Text'
import { RichText } from '../RichText'

const { useState } = React

interface AccordionProps {
  accordion: AccordionBlock
}

export const Accordion: React.FC<AccordionProps> = ({ accordion }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { body, heading } = accordion
  const toggleAccordion = () => setIsOpen(!isOpen)

  console.log(accordion)
  return (
    <AccordionWrapper mb={5}>
      <AccordionIcon>
        {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </AccordionIcon>
      <AccordionButton onClick={toggleAccordion}>
        <Heading level={3} fontWeight={3} mb={3}>
          {heading}
        </Heading>
      </AccordionButton>
      {isOpen ? (
        <AccordionInner py={2} px={4}>
          <RichText body={body} />
        </AccordionInner>
      ) : null}
    </AccordionWrapper>
  )
}
