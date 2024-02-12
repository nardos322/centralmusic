import { categoriesQueries } from "../database/queries/categoriesQueries.js";

const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;

export const categoriesController = {
    getCategories: async(req, res) => {
      
        let categories = await categoriesQueries.showCategories();
        let categoriesAndSub = {};
    

        for(const category of categories) {
            categoriesAndSub[category] = await categoriesQueries.showSubcategories(category);
        }
    
       
        return res.json({
            meta: {
                endPoint: getUrl(req),
                totalCategories: Object.keys(categoriesAndSub).length
                
            },
            data: categoriesAndSub
        });
    },
}