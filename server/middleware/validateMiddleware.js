export const validateReq = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400);
    
    const errorMessages = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
    
    return next(new Error(`Validation failed - ${errorMessages.join(', ')}`));
  }
  
  next();
};
