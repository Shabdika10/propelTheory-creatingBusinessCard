# propelTheory-creatingBusinessCard

### BusinessCard
- _id: ObjectId
- Name: String 
- Designation: String
- companyName: String
- contactNumber: Number
- emailId: String
- websiteURL: String
- socialURLs:
  Array of three strings
- companyLogo: String(Image URL)

### First API
## Creating a new businessCard
POST /createBusinessCard

### Second API
## Getting a single businessCard using _id
GET /getBusinessCard/:cardId
