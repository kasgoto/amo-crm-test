import Card from "./Card"
import { access_token, subdomain } from "./api/api"

async function CardsFetch() {
  const pagesList = []
  // Итерируем макс. 250 раза, т.к. лимит в 250 запросов
  for (let cardsPages = 1; cardsPages < 251; cardsPages++) {
    // 334*3 = 1002 мс, в секунду достаем по 3 карточки
    await new Promise((resolve) => setTimeout(resolve, 350))
    const url = `https://${subdomain}.amocrm.ru/api/v4/leads?limit=1&page=${cardsPages}`
    const getCards = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    })
    if (getCards.status !== 200) {
      break
    }
    const cardsData = await getCards.json()
    const cardsDataObject = {
      // нам нужен "__embedded", достаем 2-й ключ
      ...cardsData[Object.keys(cardsData)[2]],
      index: cardsPages,
    }
    pagesList.push({ cardsDataObject })
  }
  return pagesList
}

export default async function Cards() {
  const pagesList = await CardsFetch()

  return (
    <div className='grid grid-cols-3 items-center justify-items-center bg-neutral-200 rounded-xl w-full h-max gap-4 p-4'>
      {pagesList.map((item) => (
        <Card
          key={item.cardsDataObject.index}
          title={item.cardsDataObject["leads"][0].name}
          id={item.cardsDataObject["leads"][0].id}
          price={item.cardsDataObject["leads"][0].price}
          closestTask={item.cardsDataObject["leads"][0].closest_task_at}
          createdAt={item.cardsDataObject["leads"][0].created_at}
        ></Card>
      ))}
    </div>
  )
}
