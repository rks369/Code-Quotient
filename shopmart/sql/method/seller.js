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
    },
    changeStatus:async(pid,status,callback)=>{


        try{
            await sql.executeQuery(`UPDATE products SET status=${status} WHERE pid=${pid}`);

            callback({data:'Done'})

        }catch(err)
        {
            console.log(err);
            callback({err:err});
        }

    }
}

module.exports = seller;