export async function createOrder(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "Please login and try again"
        })
        return
    }

    const orderInfo = req.body

    if(orderInfo.name == null){
        orderInfo.name = req.user.firstName + " " + req.user.lastName
    }

    let orderId = "CBC00001"

    const lastOrder = await Order.find().sort({date : -1}).limit(1)  // Get the last order in the database

    if(lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderId // "CBC00551"
        
        const lastOrderNumberString = lastOrderId.replace("CBC", "") // "00551"
        const lastOrderNumber = parseInt(lastOrderNumberString) // 551
        const newOrderNumber = lastOrderNumber + 1 // 552
        const newOrderNumberString = String(newOrderNumber).padStart(5, "0") // "00552"
        orderId = "CBC" + newOrderNumberString // "CBC00552"
    }
    try{
        let total = 0;
        let labelledTotal = 0;
        const products = []

        for(let i = 0; i < orderInfo.products.length; i++){
            
            const item = await Product.findOne({productID : orderInfo.products[i].productId}) // Get the product from the database
            if(item == null){
                res.status(404).json({
                    message : "Product with productID " + orderInfo.products[i].productId + " not found"
                })
                return
            }
            if(item.isAvailable == false){
                res.status(404).json({
                    message : "Product with productID " + orderInfo.products[i].productId + " is not available"
                })
                return
            }
            products[i] = {
                productInfor : {
                    productId : item.productId,
                    name : item.name,
                    altNames : item.altNames,
                    description : item.description,
                    images : item.images,
                    labelledPrice : item.labelledPrice,
                    price : item.price,
                },
                quantity : orderInfo.products[i].qty
            }
            total += (item.price * orderInfo.products[i].qty)
            labelledTotal = labelledTotal + (item.labelledPrice * orderInfo.products[i].qty)
        }


        const order = new Order({
            orderId : orderId,
            email : req.user.email,
            name : orderInfo.name,
            address : orderInfo.address,
            products : orderInfo.products,
            total : 0
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Error creating order"
        })
    }

}

export async function updatedOrderStatus(req,res){
    if(!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update order status"
        })
        return;
    }

    try{
        const orderId = req.params.orderId;
        const status = req.params.status;

        await Order.updateOne(
            {
                orderId: orderId
            },
            {
                status: status
            }
        )

        res.json({
            message: "Order status updated successfully",
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Failed to update order status",
            error: e,
        });
        return;
    }
}
