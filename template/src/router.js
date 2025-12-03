export const initRouter = (app) => {
    // home/health
    app.get('/', (req, res) => {
        res.json({
            message: "Server is up"
        });
    });
}
