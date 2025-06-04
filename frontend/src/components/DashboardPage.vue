<template>
    <div class="dashboard-container">

    
     <!-- Header Section -->
      <div class="side-bar">
        <!-- <header> -->
            <div class="logo"><img src="/Logo.png" /></div>
            
           <div class="user-info">
            <div></div>
            <img src="/image.png" alt="User's Avatar">

            <span>Tara Snell</span>
            <span>Project Manager</span>

        </div>

        <!-- </header> -->
    </div>

    <!-- Dashboard Metrics Section -->
     <div class="main-board">
        <h2>Welcome Tara 👋🏻</h2>
    <section class="metrics">
         
        <div class="metric">
           
             <div class="image-contain">
            <img src="/Ellipse 3.png" alt="Inactive">
                <img src="/profile-tick.png" class="overlay-image"/>
            </div>
            <div class="metric-info">
            <span>Employees</span>
            <strong class="metric-num">5,423</strong>
            </div>
        </div>
        <div class="metric">
            <div class="image-contain">
            <img src="/Ellipse 3.png" alt="Inactive">
                <img src="/profile-2user.png" class="overlay-image"/>
            </div>
             <div class="metric-info">
            <span>Inactive</span>
            <strong class="metric-num">1,893</strong>
            </div>
        </div>
        <div class="metric">
            <div class="image-contain">
                <img src="/Ellipse 3.png" alt="Active Now">
                <img src="/monitor.png" class="overlay-image" />
            </div>
            
            <div class="metric-info">
            <span>Active Now</span>
            <strong class="metric-num">189</strong>
            </div>
            <div class="avatars">
                <!-- Placeholder for avatars -->
            </div>
        </div>
    </section>
    <!-- Active Employees Section -->
    <section class="active-employees">
        <div class="search-contain">
        <h3>Active Employees</h3>
        <div class="search-bar">
            <input type="text" class="search-box" placeholder="Search">
            <select>
                <option value="newest">Sort by: Onsite</option>
                <option value="oldest">Sort by: Absent</option>
            </select>
        </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Clock In Time</th>
                    <th>Email</th>
                    <th>Employee ID</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
              <tr v-for="(employee, index) in paginatedEmployees" :key="index">
                <td>{{ employee.name }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.time }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.id }}</td>
               <td>
                  <button :class="employee.status === 'On Site' ? 'onsite' : 'offsite'">
                     {{ employee.status }}
                  </button>
                </td>

              </tr>
            </tbody>
            
        </table> 
         
         <div class="pagination">
          <span>Showing data 1 to 8 of 256K entries</span>
        <nav v-if="totalPages > 1">
          <a href="#" @click.prevent="prevPage()">Previous</a>
          <a
            v-for="page in totalPages"
            :key="page"
            href="#"
            :class="{ active: page === currentPage }"
            @click.prevent="goToPage(page)"
          >
            {{ page }}
          </a>
          <a href="#" @click.prevent="nextPage()">Next</a>
        </nav>
        </div>

      

        <!-- new ends -->
    </section>
    <!-- Footer Section -->
    <footer>
        
        <div class="footer-slogan">
            Powered By Life Choices
        </div>
    </footer>
    </div>
    </div>
</template>


<script>
export default {
  name: "AttendanceDashboard",
  props: {
    currentUser: String,
    msg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      welcomeMessage: "Welcome Eren Yeager 👋",
      currentPage: 1,
      pageSize: 5,
      metrics: [
        { title: "Employees", count: "5,423" },
        { title: "Inactive", count: "1,893" },
        { title: "Active Now", count: "189" },
      ],
      allEmployees: [
        { name: "Tarryn Masunda", department: "HR", time: "07:39", email: "tarryn@microsoft.com", id: "545545454", status: "On Site" },
        { name: "Owethu Sityata", department: "Sales Force", time: "07:39", email: "owethu@yahoo.com", id: "545545454", status: "Off Site" },
        { name: "Sinovuyo Joe", department: "Administration", time: "07:39", email: "sino@adobe.com", id: "545545454", status: "Off Site" },
        { name: "Keanan Oliver", department: "HR", time: "07:39", email: "oliver@tesla.com", id: "545545454", status: "On Site" },
        { name: "Yandisa Khumalo", department: "Team Leader", time: "07:39", email: "yandisa@google.com", id: "545545454", status: "On Site" },
        { name: "Nandipha Zigwebile", department: "Finance", time: "07:39", email: "nandipha@gmail.com", id: "545545454", status: "On Site" },
        { name: "Asive Daniel", department: "Team Leader", time: "07:39", email: "asive@microsoft.com", id: "545545454", status: "On Site" },
        { name: "Tiffany Johnston", department: "Floor Manager", time: "07:39", email: "tiffany@yahoo.com", id: "545545454", status: "On Site" },
        { name: "Sibabalwe Lingani", department: "Health & Safety", time: "07:39", email: "siba@gmail.com", id: "545545454", status: "Off Site" },
        { name: "Lebo Mokoena", department: "Customer Service", time: "07:39", email: "lebo@uber.com", id: "545545454", status: "On Site" },
        { name: "Thabiso Molefe", department: "IT", time: "07:39", email: "thabiso@facebook.com", id: "545545454", status: "On Site" },
        { name: "Zanele Tshabalala", department: "HR", time: "07:39", email: "zanele@amazon.com", id: "545545454", status: "Off Site" },
        { name: "Linda Dlamini", department: "Marketing", time: "07:39", email: "linda@nike.com", id: "545545454", status: "On Site" },
        { name: "Khaya Dube", department: "IT", time: "07:39", email: "khaya@intel.com", id: "545545454", status: "On Site" },
        { name: "Amanda Cele", department: "Security", time: "07:39", email: "amanda@paypal.com", id: "545545454", status: "Off Site" },
      ],
      user: {
        name: "Yandisa Khumalo",
        role: "Project Manager",
      },
    };
  },
  computed: {
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.allEmployees.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.allEmployees.length / this.pageSize);
    },
  },
  // methods: {
  //   goToPage(page) {
  //     if (page >= 1 && page <= this.totalPages) {
  //       this.currentPage = page;
  //     }
  //   },
//     watch: {
//   currentPage(newVal) {
//     console.log("Page changed to:", newVal);
//   }
// }

// jk

//     methods: {
//       paginatedEmployees() {
//         const start = (this.currentPage - 1) * this.pageSize;
//         return this.allEmployees.slice(start, start + this.pageSize);
//     },
//     nextPage() {
//       this.goToPage(this.currentPage + 1);
//     },
//     prevPage() {
//       this.goToPage(this.currentPage - 1);
//     },
//   },
// };

methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      this.goToPage(this.currentPage + 1);
    },
    prevPage() {
      this.goToPage(this.currentPage - 1);
    },
  },
};
</script>

<style>
body{
    margin: 0;
    padding: 0;
    background: #FAFBFF;
}

</style>

<style scope>
   .dashboard-container{
    border:2px solid red;
    display: flex;
    justify-content: space-between;
    height: 100vh;
    /* padding: 20px; */
    gap: 3rem;
   }

   .search-contain{
    border:2px solid red;
    display: flex;
    justify-content: space-between;
    align-items:center ;
   }

   .search-box{
    width: 285px;
    height: 33px;
    margin-right: 20px;
   }

   .metric-info{
    display: flex;
    flex-direction: column;
   }

   .metric{
    display: flex;
    align-items: center;
    gap: 1rem;
   }

   .metric-num{
    font-size: 32px;
    font-weight: 600;
    font-family: 'Poppins';
   }

   .image-contain{
    position: relative;
    display: inline-block;
   }

   .overlay-image{
    position: absolute;
    top: 20px;
    left: 30px;
   }

   .side-bar{
    border:2px solid blue;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   }
   .main-board{
    border:2px solid green;
    display: flex;
    flex-direction: column;
    gap: 2rem;
   }

   .metrics{
    display: flex;
    border:2px solid purple;
    justify-content: space-around;
    gap: 2rem;
    background-color: #fff;
    width: 1250px;
   }

   .active-employees{
    border:2px solid yellow;
    background-color: #fff;
   }

   table{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid red;
   }

   tr{
    display: flex;
    justify-content: space-around;
    border: 2px solid green;
    /* padding: 8px; */
   }

   th{
    text-align: center;
    flex-grow: 1;
   }

   td{
    text-align: center;
    flex-grow: 1;
   }

   tr button{
    width: 85px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
   }

   button {
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  padding: 4px 12px;
  border: 1px solid;
  cursor: default;
  width: 86px;
  height: 29px;
  text-align: center;
}

button.onsite {
  background-color: rgba(0, 176, 135, 0.38); /* #00B087 at 38% opacity */
  border-color: #00B087;
  color: #00B087;
}

button.offsite {
  background-color: rgba(255, 71, 71, 0.38); /* #FF4747 at 38% opacity */
  border-color: #FF4747;
  color: #FF4747;
}


   .footer{
    border:2px solid orange;
   }
</style>
