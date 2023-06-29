import AsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
//create new order 
const addOrderItems=AsyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items')
        return

    }else{
          const order= new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
          })
          const createdOrder= await order.save()
          res.status(201).json(createdOrder)

    }
})

const getOrderById=AsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error ('Order not Found')
    }
})
const updateOrderToPaid=AsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address

        }
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error ('Order not Found')
    }
})

const getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).populate('user','id name');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const updateOrderToDelivered=AsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error ('Order not Found')
    }
})
export{
    addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered
}