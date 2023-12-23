import { categoriesQueries } from "../database/queries/categoriesQueries.js";

const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;

export const categoriesController = {
    getCategories: async(req, res) => {
        let category = req.params.category;
        let result = await categoriesQueries.showCategories();
      
        if(category){
            category = category.replaceAll('-', ' ');
            result = await categoriesQueries.showSubcategories(category);
           
            return res.json(result[0]);
        }
        return res.json(result[0])
    },
}