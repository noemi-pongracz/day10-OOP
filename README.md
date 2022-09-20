## Online shopping - practical exercise

- [x] The cart should hold multiple items, be able to compute their total, add and remove items.
- [x] An item should have a price and a quantity and should be able to compute its total cost.
- [x] Customer has a unique id for identification purpose within the system, an email for communication, two addresses for billing and delivery, a password for login, and a cart where all the items that are supposed to be purchased are. 
- [x] The customer should be able to change their password, email, add or remove items from the cart, or add a delivery address and/or billing address. 
- [x] The customer should also be able to purchase the items they have chosen, which means issuing an order.
- [x] An order should have unique id, the date when it was created, the total cost (items cost and delivery fee) and a status. 
- [x] The order should always be initialized with the “new” status and should be able update its status to something else (canceled, finalised). 
- [x] The order should also be able to process the billing information, which means it should be able return an object containing the billing address, total, and the issue date.
- [x] The address should have separate fields for street, city and country and an id and be able to compute the delivery fee (fictitious computation: total number characters in the street, city, and country fields).
- [x] Bonus: Do the ES5 version of the classes as well (You’d have to rename the classes so they don’t clash).
