export const validateReq = (schema) => (req, res, next) => {
  // Use safeParse to cleanly pull the exact error object without risking uncontrolled try/catch exceptions
  const result = schema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400); // Flag as Bad Request immediately
    
    // Zod v4 securely holds the structured error array under '.issues' instead of '.errors'
    const errorMessages = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
    
    // Pass cleanly structured error string forward to handler
    return next(new Error(`Validation failed - ${errorMessages.join(', ')}`));
  }
  
  // Payload perfectly validated against your Zod Schema! Pass it to Controller!
  next();
};
