const express = require('express');

const app = express()
const port = process.env.PORT || 3000;
const host = '0.0.0.0'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, host, () => {
  console.log(`Example app listening on PORT ${port}`)
})

const validate = (body) => {
  if (body.user_id) {
    return body
  } else {
    throw 'Invalid request'
  }
}

const fetch_user_data = (user_id) => {
  const users = {
    "user_id_1": {
      "name": "User 1",
      "products": ["pr1", "pr2", "pr5"]
    },
    "user_id_2": {
      "name": "User 2",
      "products": ["pr2", "pr3"]
    },
    "user_id_3": {
      "name": "User 3",
      "products": ["pr3", "pr1", "pr4"]
    },
    "user_id_4": {
      "name": "User 4",
      "products": ["pr2"]
    },
    "user_id_5": {
      "name": "User 5",
      "products": ["pr5", "pr1"]
    },
    "user_id_6": {
      "name": "User 6",
      "products": ["pr4", "pr2", "pr1"]
    }
  }
  if(users[user_id]) {
    return users[user_id]
  } else {
    throw 'User not found'
  }
}

const fetch_product = (product_id) => {
  const products = {
    "pr1": {
      "name": "Product 1",
      "price": 100
    },
    "pr2": {
      "name": "Product 2",
      "price": 200
    },
    "pr3": {
      "name": "Product 3",
      "price": 300
    },
    "pr4": {
      "name": "Product 4",
      "price": 400
    },
    "pr5": {
      "name": "Product 5",
      "price": 500
    }
  }
  if (products[product_id]) {
    return products[product_id]
  } else {
    throw 'Product not found'
  }
}

app.get('/test', (req, res) => {
	try {
		const payload = validate(req.query)
		const user_data = fetch_user_data(payload.user_id)
		const product_ids = user_data.products
    let products = []
    product_ids.forEach((product_id) => {
			const product_data = fetch_product(product_id)
			products.push(product_data)
		})
		user_data.products = products		
		res.send(user_data)
	} catch(error) {
		console.log(error)
    res.send("invalid request")
	}
})