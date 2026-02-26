export default function checkValidation(schema,data) {
    
    const result = schema.safeParse(data);
    const errors = {};

    if(result.success){
        return { success: true, data: result.data };
    }

     result.error.issues.forEach((err) => {
          errors[err.path[0]] = err.message;
        });

    return { success: false, errors };
}