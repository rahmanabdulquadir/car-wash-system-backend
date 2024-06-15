// const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//       return next(new AppError('You are not logged in! Please log in to get access.', 401));
//     }

//     const decoded = jwt.verify(token, config.jwt.secret) as { id: string };

//     const currentUser = await User.findById(decoded.id);
//     if (!currentUser) {
//       return next(new AppError('The user belonging to this token does no longer exist.', 401));
//     }

//     req.user = currentUser;
//     next();
//   } catch (error) {
//     next(new AppError('Authentication failed', 401));
//   }
// };

// export default authMiddleware;