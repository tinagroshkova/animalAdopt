This is a solution to an IT Talents Training Camp Exam Task to create a SPA for animal adoption:
![Screenshot_25](https://user-images.githubusercontent.com/57560115/235607023-3f8750d7-8a64-449f-9914-da26076d739d.png)
![Screenshot_26](https://user-images.githubusercontent.com/57560115/235607112-4fc00e24-3b68-415e-9621-c70137a34e1d.png)
![Screenshot_27](https://user-images.githubusercontent.com/57560115/235607126-a4a2ac8d-bd39-4f39-8ab1-4317e78e29e5.png)


On each page we have a header section where we have:
1. Logo.
2. Link to the main list of animals in need - home.
3. Link to page with adopted animals.
The application consists of the following pages:
1. Main page:
a. On the main page all animals are visualized,
which are in the system, in the form of a card.
b. Each animal has the following characteristics
i. photo
ii. name
iii. type (cat, dog, dinosaur, snake, etc.)
iv. breed
v. age
i. gender
vii. required amount
viii. current amount collected
c. There is an opportunity for any animal to be adopted, through
Adopt button. If we adopt an animal, it should be
removed from list of animals from main page.
d. If the entire amount needed for the support of
the animal, has a Donate button through which we have access to
donation page. If the amount is collected, this button is
invisible.
e. The list of animals can be filtered:
i. by entering free text to search by name
ii. by selecting a type from a drop-down list.
iii. When entering a value in both fields,
the filtered results must also match the
both conditions.
2. Donation page
a. We have access to this page by clicking on one of the
the Donate buttons.
b. The page displays:
i. message: How much do you want to donate for <animal
name>?, where animal name is the name of the animal, for
which we have decided to donate.
ii. text field for entering the name of the donor,
iii. a field in which the donation amount is entered,
iv. button Donate, which makes the donation. When
will be clicked if the required data is filled in,
the button creates a new entry in the table from item v and clears
the filled data in the form.
v. table with 3 columns: date, name, donated amount. In this
a table keeps a history of all donations made
by the user.
i. When trying to donate more than necessary,
the donation amount is automatically recalculated, as
the difference between the required amount and current
the amount collected for the respective animal.
3. Adopted animals page
a. A list of all the animals that we are is displayed
adopted. A card is visualized for each animal,
similar to that of the main page.
b. The difference with the main page is as follows:
i. instead of the required amount - date and time of adoption.
ii. there is no Donate button.
iii. there is a Leave button, through which we abandon the animal,
after which it should be visible in the list from
main page and disappear from the current list with
adopted animals.
