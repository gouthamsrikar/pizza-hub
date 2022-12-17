import React, { useState } from 'react'






type pizzaItem = {
  title: string
  imgUrl: string
}




const PizzaMakerText = () => {

  const toppings: pizzaItem[] = [
    {
      title: "topping 1",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Ftopping1.png?alt=media&token=8c9a3225-599d-45e2-8be4-5b9a3d28f3fd"
    },
    {
      title: "topping 2",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Ftopping2.png?alt=media&token=6445336c-6b5f-47f1-a989-58b087427f88"
    },
    {
      title: "topping 3",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Ftopping3.png?alt=media&token=3c2bd718-9266-436f-b5f0-b0ddc6f841d6"
    }
  ]
  const base: pizzaItem[] = [
    {
      title: "Base 1",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Fbase1.png?alt=media&token=0416316d-e757-4850-8a63-96959eebeb98"
    },
    {
      title: "Base 2",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Fbase2.png?alt=media&token=1bcff153-ffb9-483f-ad32-3b47c170218d"
    },
    {
      title: "Base 3",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/mama-survey-351405.appspot.com/o/pizza%2Fbase3.png?alt=media&token=eb45743a-7bf9-49ae-a946-b011c19abef3"
    }
  ]


  const [PizzaState, SetPizzaState] = useState("base")


  const [SelectedBase, SetSelectedBase] = useState({
    title: "",
    imgUrl: ""
  } as pizzaItem)


  const [SelectedToppings, SetSelectedToppings] = useState([] as pizzaItem[])


  const onDragStart = (ev: React.DragEvent<HTMLDivElement>, id: pizzaItem, type: string) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("title", id.title);
    ev.dataTransfer.setData("imgUrl", id.imgUrl);
    ev.dataTransfer.setData("type", type);
  }

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }

  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    var title = ev.dataTransfer.getData("title");
    var imgUrl = ev.dataTransfer.getData("imgUrl");
    var type = ev.dataTransfer.getData("type");


    if (type === "base") {
      SetSelectedBase({ title: title, imgUrl: imgUrl })
    }
    else {

      if (SelectedToppings.filter((item) => { if (item.title === title) return item }).length === 0) {
        SetSelectedToppings([...SelectedToppings, { title: title, imgUrl: imgUrl }])
      }
    }
    console.log(SelectedBase)
  }

  return (
    <div className='items-center flex justify-around'>

      <div>
        <div>
          {
            PizzaState === "base" ? "Base (drag and drop)" : PizzaState === "toppings (drag and drop)" ? "Toppings" : ""

          }
        </div>
        {
          PizzaState === "base" ?
            <div className='flex py-10 gap-5'>

              {base.map((item) => <div
                onDragStart={(e) => onDragStart(e, item, "base")}
                draggable
                key={item.title}
                className='py-5 px-10 bg-yellow-200 rounded-full'>{item.title}</div>)}
            </div> :
            PizzaState === "toppings" ?
              <div className='flex py-10 gap-5'>
                {toppings.map((item) => <div
                  onDragStart={(e) => onDragStart(e, item, "topping")}
                  draggable
                  key={item.title}
                  className='py-5 px-10 bg-yellow-200 rounded-full'>{item.title}</div>)}
              </div> :

              <div>Your pizza is ready</div>
        }
      </div>

      <div>

        <div className='relative h-[400px] aspect-square bg-slate-300 text-center rounded-full'

          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}

        >

          {
            SelectedBase.imgUrl !== "" ?
              (<img className='absolute' src={SelectedBase.imgUrl} alt="" />)
              : <div className='absolute top-[45%] left-[40%]'>drop here</div>
          }


          {
            SelectedToppings.map((e) => <img className='absolute' src={e.imgUrl} alt="" />)
          }

        </div>

        {SelectedBase.title !== "" ? <div className='py-5 my-10 bg-yellow-200 rounded-full justify-center text-center'
          onClick={() => {
            if (PizzaState === "base") {
              SetPizzaState("toppings")
            }
            else if (PizzaState === "toppings") {
              SetPizzaState("finished")

            }
          }}
        >
          {
            PizzaState === "base" ? "select base" : PizzaState === "toppings" ? "select toppings" : "finished"
          }
        </div> : <></>}

      </div>



    </div>
  )
}





export default PizzaMakerText
