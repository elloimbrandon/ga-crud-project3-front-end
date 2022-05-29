import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'




const App = () => {

  const [store, setStore] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newSoldOut, setNewSoldOut] = useState(false)



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
    setNewSoldOut(event.target.checked)
  }



  const newItemSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://project-3-backend-ga.herokuapp.com/store`, {
      itemName:newItemName,
      category:newCategory,
      description:newDescription,
      price:newPrice,
      image:newImage,
      rating:newRating,
      soldOut:newSoldOut
    }).then(() => {
      axios.get('https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
        console.log(response.data);
      })
    })
  }

  useEffect(() => {
    axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
      setStore(response.data)
    })
  }, [])


  const deleteItem = (storeData) => {
    axios.delete(`http://project-3-backend-ga.herokuapp.com/store/${storeData._id}`).then(() => {
      axios.get('http://https://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }

  useEffect(() => {
    axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
      setStore(response.data)
    })
  },[deleteItem])



  const updateItem = (event, storeData) => {
    event.preventDefault()
    axios.put(`http://project-3-backend-ga.herokuapp.com/store/${storeData._id}`, {
      itemName:newItemName,
      category:newCategory,
      description:newDescription,
      price:newPrice,
      image:newImage,
      rating:newRating,
      soldOut:newSoldOut
    }).then(() => {
      axios.get('http://project-3-backend-ga.herokuapp.com/store').then((response) => {
        setStore(response.data)
      })
    })
  }


  return (
    <div className="store-container">
      <div className="top-container">
        <div className="h1">
        <h1>Welcome to Ibay, where shopping is a pleasure</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <div className="item-1">
            <li className="nav-item nav-item-1"><i className="fa-solid fa-basketball"></i></li><br/>
            <h2>Sports</h2>
          </div>
          <div className="item-2">
            <li className="nav-item nav-item-2"><i className="fa-solid fa-mobile-screen-button"></i></li><br/>
            <h2>Electronics</h2>
          </div>
          <div className="item-3">
            <li className="nav-item nav-item-3"><i className="fa-solid fa-shirt"></i></li><br/>
            <h2>Clothes</h2>
          </div>
          <div className="item-4">
            <li className="nav-item nav-item-4"><i className="fa-solid fa-burger"></i></li><br/>
            <h2>Food</h2>
          </div>
        </ul>
      </nav>
    </div>
    <div className="add-item">
      <div className="text-box">
        <p>Add </p>
        <div className="text-box-text">
          <span>Sport</span>
          <span>Electronic</span>
          <span>Clothing</span>
          <span>Food</span>
        </div>
        <p>item!!</p>
        <div className="text-box-icon">
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
      <div className="form-box">
        <form onSubmit={newItemSubmit}>
          <div className="form-name">Name:<textarea type="text" rows="1" cols="60" onChange={handleNewItemName} required/><br/></div>
          <div className="form-category">Category:
              <select name="category" onChange={handleNewCategory} required>
                <option value="">category</option>
                <option value="sports">Sports</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="food">Food</option>
              </select><br/>
          </div>
          <div className="form-description">Description: <textarea rows="2" cols="60" type="text" onChange={handleNewDescription} required/><br/>
          </div>
          <div className="form-price">Price: <textarea rows="1" cols="60" type="text" onChange={handleNewPrice} required/><br/>
          </div>
          <div className="form-image">Image:<textarea rows="1" cols="60" type="url" onChange={handleNewImage}/><br/>
          </div>
          <div className="form-rating">Rating:
            <select name="rating" onChange={handleNewRating} required>
              <option value=''>Select rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select><br/>
          </div>
          <div className="form-availability">Out of stock: <input type="checkbox" onChange={handleSoldOut}/><br/>
          </div>
          <div className="form-submit"><input type="submit" value="Add Item to the Store"/>
          </div>
        </form>
      </div>
    </div>
      <ul className="item-container">
        {store.map((item) => {
          return (
              <li key={item._id} className="single-item">
                Name: {item.itemName}<br/>
                Category: {item.category}<br/>
                Description: {item.description}<br/>
                Price: ${item.price.$numberDecimal}<br/>
                {item.image == "" ? null : <img src={item.image}/>}<br/>
                Rating: {item.rating}<br/>
                {item.soldOut ? <p>The item is out of stock<i className="fa-regular fa-circle-xmark"></i> </p> : <p>This item is in stock<i className="fa-solid fa-square-check"></i></p>}
                <button onClick={(event) => {
                  deleteItem(item)
                }}>Delete this item!</button><br/>
                <form onSubmit={(event) => {
                  updateItem(item)
                }}>
                  <div className="edit-name">Name:<textarea type="text" rows="1" cols="30" onChange={handleNewItemName} required/><br/></div>
                  <div className="edit-category">Category:
                    <select name="category" onChange={handleNewCategory} required>
                      <option value="">category</option>
                      <option value="sports">Sports</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothes">Clothes</option>
                      <option value="food">Food</option>
                    </select><br/>
                  </div>
                  <div className="edit-description">Description: <textarea rows="2" cols="40" type="text" onChange={handleNewDescription} required/><br/>
                  </div>
                  <div className="edit-price">Price: <textarea rows="1" cols="30" type="text" onChange={handleNewPrice} required/><br/>
                  </div>
                  <div className="edit-image">Image:<textarea rows="1" cols="30" type="url" onChange={handleNewImage}/><br/>
                  </div>
                  <div className="edit-rating">Rating:
                    <select name="rating" onChange={handleNewRating} required>
                      <option value=''>Select rating</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select><br/>
                  </div>
                  <div className="edit-availability">Out of stock: <input type="checkbox"   onChange={handleSoldOut}/><br/>
                  </div>
                  <div className="edit-submit"><input type="submit" value="Edit Item"/>
                  </div>
                </form>
              </li>
          )
        })}
      </ul>
    </div>
  )

}


export default App;
