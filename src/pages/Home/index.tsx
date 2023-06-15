import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type InputNewCreateCycle = {
  task: string
  minutesAmount: number
}

export function Home() {
  const { register, handleSubmit, watch } = useForm<InputNewCreateCycle>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const isSubmitDisabled = !watch('task')

  function handleNewCreateCycle({ task, minutesAmount }: InputNewCreateCycle) {
    console.log({
      task,
      minutesAmount,
    })
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCreateCycle)} action="">
        <FormContainer>
          <label htmlFor="task">My Working</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="project 1"></option>
            <option value="project 2"></option>
            <option value="project 3"></option>
            <option value="project 4"></option>
          </datalist>

          <label htmlFor="minutesAmount">duration</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
