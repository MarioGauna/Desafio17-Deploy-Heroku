import knex from 'knex'

export default class contenedorProd {
    constructor(options,table) {
        this.knex = knex(options);
        this.table = table;
    }
    async save(newDato){
        try{
            const exist = await this.knex.schema.hasTable(this.table);
            if (exist){
                await this.knex(this.table).insert(newDato)
                const res= JSON.stringify(await this.knex.from(this.table).select('*').orderBy('id','desc').limit(1))
                const result = JSON.parse(res)
                return result
            } else {
                await this.knex.schema.createTable('productos',table=>{
                    table.increments('id').primary().unique()
                    table.string('title',50).notNullable()
                    table.float('price').notNullable()
                    table.string('image',200).notNullable()
                })
                await this.knex(this.table).insert(newDato)
                const res= JSON.stringify(await this.knex.from(this.table).select('*').orderBy('id','desc').limit(1))
                const result = JSON.parse(res)
                return result
            }
        }catch(error){
            console.log('Hubo un error al guardar el articulo',error);
        }
    }
    async getAll(){
        try {
            const exist = await this.knex.schema.hasTable(this.table);
            if (exist){
                const res = JSON.stringify(await this.knex.from(this.table).select('*'));
                const result = JSON.parse(res)
                return result
            } else {
                return null
            }
        } catch (error) {
            console.log('Hubo un error al mostrar la base de datos',error);
        }
    }
    // async getById(numId){ 
    //     try{
    //         const data = await this.getAll();
    //         return data.find(x => x.id == numId);
    //     }catch(error){
    //         console.log('Hubo un error al obtener el producto seleccionado',error);
    //     }
    // }
    // async updateById(numId,newProd){
    //     try{
    //         const data = await this.getAll();
    //         const prod = data.find((x) => x.id == numId);
    //         const index = data.indexOf(prod);
    //         if (prod){
    //             let [id,timestamp] = [parseInt(numId),data[index].timestamp]
    //             data[index] = {...newProd,timestamp:timestamp,id:id}
    //             await fs.promises.writeFile(this.fileName,JSON.stringify(data))
    //             return data[index]
    //         }else{
    //             return null
    //         }
    //     } catch (error){
    //         console.log('Hubo un error al actualizar el producto seleccionado',error);
    //     }
    // }
    // async deleteById(numId){
    //     try {
    //         const data = await this.getAll();
    //         let res = data.find(x => x.id == numId);
    //         if(res === undefined){
    //             return null
    //         }else{
    //             let newData = data.filter((item) => item.id != numId);
    //             const dataJsonFinal=JSON.stringify(newData);
    //             await fs.promises.writeFile(this.fileName,dataJsonFinal)
    //             return newData
    //         }
    //     } catch (error) {
    //         console.log('Hubo un error al borrar el articulo seleccionado',error);
    //     }
    // }
}