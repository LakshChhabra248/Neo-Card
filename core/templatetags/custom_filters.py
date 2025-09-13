import json
from django import template

register = template.Library()

@register.filter(name='parse_json_items')
def parse_json_items(json_string):
    """
    Yeh filter ek JSON string ko leta hai aur usko ek aache, readable string mein badalta hai.
    Example: "[{'name': 'Samosa', 'quantity': 1}]" -> "Samosa (x1)"
    """
    try:
        items = json.loads(json_string.replace("'", "\"")) # Single quotes ko double quotes se badlo
        
        # Har item ke liye 'Name (xQuantity)' format banao
        formatted_items = [f"{item['name']} (x{item['quantity']})" for item in items]
        
        # Saare items ko comma se jod do
        return ", ".join(formatted_items)
    except (json.JSONDecodeError, TypeError):
        # Agar koi error aaye, to original string wapas bhej do
        return json_string