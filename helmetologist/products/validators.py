from django.core.exceptions import ValidationError

def validate_product_data(product_name, price, description, details, category_id, thumbnail, quantity):
    if not all([product_name, price, description, details, category_id, thumbnail, quantity]):
        raise ValidationError("All fields are required")
    
    if not (3 <= len(product_name) <= 50):
        raise ValidationError("Product name must be between 3 and 50 characters")
    
    if not product_name.isalnum():
        raise ValidationError("Product name can only contain letters and numbers")

    try:
        price = float(price)
        if price <= 0:
            raise ValidationError("Price must be a positive number")
    except ValueError:
        raise ValidationError("Invalid price format")

    if len(description) < 10:
        raise ValidationError("Description must be at least 10 characters")

    if len(details) < 10:
        raise ValidationError("Details must be at least 10 characters")

    allowed_extensions = ['jpg', 'jpeg', 'png', 'gif']
    file_extension = thumbnail.name.split('.')[-1].lower()
    if file_extension not in allowed_extensions:
        raise ValidationError("Invalid file type for thumbnail. Allowed: jpg, jpeg, png, gif")

    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValidationError("Invalid quantity")
    except ValueError:
        raise ValidationError("Invalid quantity")
    
    return price, quantity