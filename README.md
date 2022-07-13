# propelTheory-creatingBusinessCard

### Profile
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
## Creating a new profile
POST /createBusinessCard

### Second API
## Getting a single profile using _id
GET /getBusinessCard/:cardId
