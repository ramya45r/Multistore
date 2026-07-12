import Stock from "../models/Stock.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";

export const createStock = async (req, res) => {
  try {
    const { product, store, quantity } = req.body;

    if (!product || !store || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product, Store and Quantity are required",
      });
    }

    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Store
    const storeExists = await Store.findById(store);
    if (!storeExists) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const existingStock = await Stock.findOne({ product, store });

    if (existingStock) {
      return res.status(400).json({
        success: false,
        message: "Stock already exists for this product in this store",
      });
    }

    const stock = await Stock.create({
      product,
      store,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Stock created successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStocks = async(req,res)=>{

 try{

   const { lowStock } = req.query;


   let filter = {};


   if(lowStock){

     filter.quantity = {
       $lte:Number(lowStock)
     };

   }


   const stocks = await Stock.find(filter)
     .populate("product")
     .populate("store");


   res.status(200).json({
     success:true,
     stocks
   });


 }catch(error){

   res.status(500).json({
     success:false,
     message:error.message
   });

 }

};

export const adjustStock = async (req, res) => {
  try {
    const { productId, storeId, quantity } = req.body;

    const stock = await Stock.findOne({
      product: productId,
      store: storeId,
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    stock.quantity += quantity;

    if (stock.quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    await stock.save();

    res.status(200).json({
      success: true,
      message: "Stock adjusted successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const transferStock = async (req, res) => {
  try {
    const { product, fromStore, toStore, quantity } = req.body;
console.log(req.body);

    if (!product || !fromStore || !toStore || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (fromStore === toStore) {
      return res.status(400).json({
        success: false,
        message: "Source and destination stores cannot be the same",
      });
    }

    const sourceStock = await Stock.findOne({
      product,
      store: fromStore,
    });

    if (!sourceStock) {
      return res.status(404).json({
        success: false,
        message: "Source stock not found",
      });
    }

    if (sourceStock.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock in source store",
      });
    }

    let destinationStock = await Stock.findOne({
      product,
      store: toStore,
    });

    if (!destinationStock) {
      destinationStock = await Stock.create({
        product,
        store: toStore,
        quantity: 0,
      });
    }

    sourceStock.quantity -= quantity;
    destinationStock.quantity += quantity;

    await sourceStock.save();
    await destinationStock.save();

    res.status(200).json({
      success: true,
      message: "Stock transferred successfully",
      sourceStock,
      destinationStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getStoreProducts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const stocks = await Stock.find({ store: id })
      .populate("product")
      .populate("store");
console.log(stocks);

    res.status(200).json({
      success: true,
      store: stocks.length > 0 ? stocks[0].store : null,
      products: stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};