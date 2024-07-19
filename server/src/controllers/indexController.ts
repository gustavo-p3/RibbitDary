import { Request, Response} from "express";


class IndexController{
    public index(req : Request, resp : Response){
        resp.send('Quiubole RAZA!!!');
    }
}

export const indexController = new IndexController();
