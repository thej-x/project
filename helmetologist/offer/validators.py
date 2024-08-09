
from django.utils import timezone
from django.core.exceptions import ValidationError
import re
from datetime import datetime, date



def validate_offer_data(name, start_date, end_date, discount_percentage):
    errors = []

    # Offer name validation
    if not name or not isinstance(name, str):
        errors.append("Offer name is required and must be a string.")
    elif name.startswith(' '):
        errors.append("Offer name should not start with a space.")

    # Date validation
    today = timezone.now().date()

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    except ValueError:
        errors.append("Start date must be a valid date in the format YYYY-MM-DD.")

    try:
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    except ValueError:
        errors.append("End date must be a valid date in the format YYYY-MM-DD.")

    if start_date and start_date < today:
        errors.append("Start date must be today or a future date.")
    
    if end_date and start_date and end_date <= start_date:
        errors.append("End date must be after the start date.")

    # Discount percentage validation
    try:
        discount_percentage = float(discount_percentage)
        if discount_percentage < 0 or discount_percentage > 75:
            errors.append("Discount percentage must be a number between 0 and 75.")
    except ValueError:
        errors.append("Discount percentage must be a valid number.")

    if errors:
        raise ValidationError(errors)