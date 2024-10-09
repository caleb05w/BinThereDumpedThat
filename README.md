# stormhacks2024


Inspiration✨

Sometimes the hardest thing about garbage is knowing where to sort it. As students, we realized we weren’t always sure about how to properly sort our garbage, leading to confusion. Other students faced similar issues, often not being able to differentiate between recycling, compost, or general waste.

Additionally, we wanted to create a system that would make waste management more efficient for janitorial staff. Trash bins often are overflowing which would require urgent attention to maintain cleanliness in public spaces - on the other hand, sometimes janitors are required to empty bins despite them not being full due to fixed schedules, leading to unnecessary work and an unsustainable use of plastic garbage bags.
What it does🔥

Bin There, Dumped That is an easily integrate able hardware system that attaches to standard garbage cans. Through monitoring their status, we can provide real-time updates on whether the bin is full, empty, or partially filled for janitorial staff reference. It also tracks the location of each bin, to optimize the most efficient pathway to it. This allows janitorial staff to focus on the bins that need attention while skipping those that are empty or barely used. Daily users engage in a sorting feature that enables them to properly dispose of their waste in the accurate bin.
How we built it🛠️

We started by creating mockups and a user flow on Figma. After the mockups were created, we began building the user interface using React and Tailwind for the front-end, Node.js, Express.js, and Amazon Web Services power the back-end, with MongoDB as our database. For the hardware, we integrated Arduino with C++ to control sensors, while a Python Library and TensorFlow used for image recognition. The image is then returned and parsed through OpenAI.

The data is processed and transmitted to a centralized web-based platform where janitors and facility managers can view real-time status updates. The platform integrates with a database to store data, analyze trends, and optimize future garbage collection routes.
Challenges we ran into💥

One of the primary challenges was calibrating the ultrasonic sensors to account for different types of waste that can distort readings. During the final hour of the hackathon, we ran into issues parsing garbage bin status's, and distinguishing between different states (empty and not empty). During our roadmap, we were really ambitious with the features we wanted to implement. One of the main features we scrapped was an interactive map housing all the garbage cans locations.
Accomplishments that we're proud of🎉

We are proud to have created a fully functional prototype that addresses a real-world problem. By developing both the hardware and software components in sync, we were able to create an integrated system that is easy to use and deploy that solved problems that we face daily, while also creating an effective solution for janitorial teams.
What we learned🧠

We had a diverse team, featuring an Electrical Engineer, a Comp Sci student, a Business student, and a SIAT student. As a result, we were able to share elements of our own faculties during the development process. We shared ideation on UX/UI, Front end and Back end, hardware systems, and even elements of a case competition. Throughout the development process, we gained valuable insights into hardware-software integration, sensor calibration, and building user-friendly interfaces for non-technical users. We also learned the importance of testing in real-world environments to refine our solution based on actual user needs.
What's next for Bin There, Dumped That.💥

Looking towards the future, we hope to to implement a more secure login system for users and the implementation of data analytics to motivate users to keep applying for jobs and visualize the successful results of their hard work. We also wish to implement thorough data visualizations and analytics to provide further insight into the statistical aspect of the job hunting journey. As mentioned earlier, a user map would be extremely helpful for navigation purposes
