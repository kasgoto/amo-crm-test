"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loading from "../loading"
import todayImage from "./assets/today.svg"
import tomorrowImage from "./assets/tomorrow.svg"
import yesterdayImage from "./assets/yesterday.svg"
import Image from "next/image"

interface CardProps {
  title: string
  id: string
  price: string
  closestTask: number
  createdAt: number
}

const Card: React.FC<CardProps> = (props) => {
  const [date, setDate] = useState("")
  const [taskDay, setTaskDay] = useState("")

  // Функция нужна для обработки данных карточки
  async function getCardData() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Конвертация unix-time в дату
    const date = new Date(props.createdAt * 1000).toLocaleDateString("ru-RU")
    setDate(date)

    // Берем сегодняшнюю дату и сравниваем ее с датой задачи
    const task = new Date(props.closestTask * 1000).toLocaleDateString("ru-RU")
    const currentDate = new Date().toLocaleDateString("ru-RU")

    if (currentDate === task) {
      const taskDay = "Сегодня"
      setTaskDay(taskDay)
    } else if (currentDate < task) {
      const taskDay = "Завтра"
      setTaskDay(taskDay)
    } else {
      const taskDay = "Вчера"
      setTaskDay(taskDay)
    }
  }

  // При нажатии карточки выводится диалог с подробными данными, использована библиотека Shadcn
  return (
    <Dialog>
      <DialogTrigger asChild onClick={getCardData}>
        <div className='w-full h-full bg-neutral-100 grid grid-rows-[1fr_2fr_1fr] items-center justify-items-center shadow-md rounded-xl hover:brightness-95 hover:border-neutral-400 border border-neutral-300 transition'>
          <div className='w-full h-full bg-orange-50 p-2 rounded-t-xl flex items-center justify-center'>
            <p className='text-sky-700 font-light'>Карточка №{props.id}</p>
          </div>
          <div className='w-full h-full bg-stone-50 p-4 flex items-center justify-center border-y border-neutral-200'>
            <h3 className='text-xl font-medium'>{props.title}</h3>
          </div>
          <div className='w-full h-full bg-sky-50 p-2 rounded-b-xl flex items-center justify-center'>
            <p className='text-zinc-500 font-semibold'>{props.price}₽</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-xl'>
        {taskDay ? (
          <>
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
              <DialogDescription>ID: #{props.id}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>Дата: {date}</div>
            <DialogFooter className='flex items-center justify-center'>
              <p>Ближайшая задача: {taskDay}</p>
              <Image
                src={
                  taskDay === "Вчера"
                    ? yesterdayImage
                    : taskDay === "Завтра"
                    ? tomorrowImage
                    : todayImage
                }
                width={25}
                height={25}
                alt='status'
              />
            </DialogFooter>
          </>
        ) : (
          <Loading />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Card
