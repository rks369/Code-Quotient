const sql = require("../sql_config");

const seller = {
    getProductList:async (seller_id,current_index,count ,callback)=>{
        console.log(seller_id);
        try{
            const productList = await sql.executeQuery(`SELECT * FROM products WHERE seller_id = '${seller_id}' ORDER BY pid
            OFFSET ${current_index} ROWS
            FETCH NEXT ${count} ROWS ONLY;`)
            callback({data:productList});
        }catch(err)
        {
            callback({err:err});
        }
    }
}

module.exports = seller;