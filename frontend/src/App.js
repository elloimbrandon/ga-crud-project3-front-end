import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [store, setStore] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState({})
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState('')
  const [soldOut, setSoldOut] = useState(false)

  const handleNewItemName = (event) => {
    setNewItemName(event.target.value)
  }
  const handleNewCategory = (event) => {
    setNewCategory(event.target.value)
  }
  const handleNewDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const handleNewPrice = (event) => {
    setNewPrice(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewRating = (event) => {
    setNewRating(event.target.value)
  }
  const handleSoldOut = (event) => {
    setSoldOut(event.target.checked)
  }

  const newItemSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://project-3-backend-ga.herokuapp.com/store`, {
      name:newItemName,
      category:newCategory,
      description:newDescription,
      price:newPrice,
      image:newImage,
      rating:newRating,
      soldOut:false
    }).then(() => {
      axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
        // console.log(response.data);
      })
    })
  }

  useEffect(() => {
    axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
      setStore(response.data)
      // console.log(response.data);
    })
  }, [])

  const deleteItem = (storeData) => {
    axios.delet(`http://project-3-backend-ga.herokuapp.com/store/${storeData._id}`).then(() => {
      axios.get('http://https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }

  const updateItem = (event, storeData) => {
    event.preventDefault()
    axios.put(`http://project-3-backend-ga.herokuapp.com/store/${storeData._id}`, {
      itemName:newItemName,
      category:newCategory,
      description:newDescription,
      price:newPrice,
      image:newImage,
      rating:newRating,
      soldOut:false
    }).then(() => {
      axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }

  const showSearch = (event) => {
    event.preventDefault()
    axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
      setStore(response.data)
    })
  }

  return (
    <>
    <h1>Store Name</h1>
    <h2>Search</h2>
    <form action="/" method="GET" onSubmit={showSearch}>
      <input type="text" name="search" />
      <input type="submit" value="search" />
    </form>
    <h2>Add a New Item</h2>
    <form onSubmit={newItemSubmit}>
      Name:<input type="text" onChange={handleNewItemName} required/><br/>
      Category: <select name="category" onChange={handleNewCategory} required>
                  <option value="">category</option>
                  <option value="sports">Sports</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothes">Clothes</option>
                  <option value="food">Food</option>
                </select><br/>
      Description: <input type="text" onChange={handleNewDescription} required/><br/>
      Price: <input type="text" onChange={handleNewPrice} required/><br/>
      Image:<input type="url" onChange={handleNewImage}/><br/>
      Rating: <select name="rating" onChange={handleNewRating} required>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              </select><br/>
      Availability: <input type="checkbox" onChange={handleSoldOut}/><br/>
      <input type="submit" value="Add Item to the Store"/>
    </form>
    <ul>
      {store.map((item) => {
        return (
          <li key={item._id}>
          Name:{item.itemName}<br/>
          Category:{item.category}<br/>
          description:{item.description}<br/>
          image:<img src={item.image}/><br/>
          rating:{item.rating}<br/>
          Availability:{item.soldOut}<br/>
          </li>
        )
      })}
    </ul>
    </>
  )

}


export default App;
