<template>
    <div class="dashboard-container">

    
     <!-- Header Section -->
      <!-- <div class="side-bar">
         <header> -->
            <!-- <div class="logo"><img src="/Logo.png" /></div> -->
            
           <!-- <div class="user-info">
            <div></div>
           

            <span>Tara Snell</span><br>
            <span>Project Manager</span>

        </div> -->

        <!-- </header> -->
    <!-- </div> --> 

    <!-- Dashboard Metrics Section -->
     <div class="main-board">
      <div class="welcome-msg">
        <h2>Welcome Tara 👋🏻</h2>

         <img class="Tara-Pfp" src="/image.png" alt="User's Avatar">
      </div>
        
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
          <div class="search-icon-input">
            <input type="text" class="search-box" placeholder="     Search">
            <img src="/search 1.png" class="overlay-icon" />
          </div>
            
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

      <!-- Footer Section -->
<footer>
        
        <div class="footer-slogan">
            Powered By Life Choices
        </div>
    </footer>
        <!-- new ends -->
    </section>
    
    
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
    
    display: flex;
    justify-content: space-between;
    height: 100vh;
    /* padding: 20px; */
    gap: 3rem;
   }

   .welcome-msg{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 10px; */
    /* border: 2px solid blue; */
   }

   .Tara-Pfp{
    width: 60px;
    height: 50px;
   }

   .search-contain{
    display: flex;
    justify-content: space-between;
    align-items:center ;
   }

   .search-icon-input{
    position: relative;
    /* border: 2px solid brown; */
   }

   .overlay-icon{
    position: absolute;
    top: 10px;
    left: 5px;
   }

   .search-box {
    /* border: 2px solid brown; */
  /* position: absolute; */
  /* left: 1000px; */
  
  width: 300px;
  height: 33px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #4a4a4a;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.01em;
  /* margin-right: -200px; */
  /* margin-top: -20px; */
  
}

select {
  /* position: absolute; */
  /* left: 1360px; */
  width: 120px;
  height: 29px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #4a4a4a;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.01em;
  /* margin-right: -180px; */
  /* margin-top: -20px; */

}

.search-bar{
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 100px;
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
    line-height: 32px;
    font-size: 32px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #333;
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
    /* border:2px solid blue; */
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
   }
   .main-board{
    /* border:2px solid green; */
    display: flex;
    flex-direction: column;
    /* height: 500px; */
    gap: 2rem;
   }

   .metrics{
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    background-color: #fff;
    width: 1250px;
    height: 151px;
    border-radius: 30px;
    box-shadow: 0 10px 60px rgba(226, 236, 249, 0.5); 
    padding: 16px 8px; 
   }

   .active-employees{
    background-color: #fff;
    width: 1250px;
    height: 613px;
    border-radius: 30px;
    box-shadow: 0 10px 60px rgba(226, 236, 249, 0.5); 
    padding: 16px 8px; 
}

   .active-employees table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #292D32;
}

.active-employees th,
.active-employees td {
  padding: 12px 16px;
  text-align: left; /* You can also use 'center' or 'right' per column */
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
}

.active-employees th {
  font-weight: 600;
  background-color: #fff;
  color: #B5B7C0;
}

.active-employees h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;     
  letter-spacing: -0.01em; 
  color: #333333;         
    
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
  gap: 10px;
  
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

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #b5b7c0; 
}

.pagination nav {
  display: flex;
  gap: 6px;
}

.pagination a {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #e5e7eb; 
  background-color: #f9fafb; 
  color: #0f4392; 
  text-decoration: none;
  font-weight: 500;
  min-width: 25px;
  text-align: center;
  gap: 10px;
  transition: background-color 0.2s, color 0.2s;
}

.pagination a:hover {
  background-color: #e5e7eb;
}

.pagination a.active {
  background-color: #0f4392; 
  color: #fff;
  border-color:#0f4392; 
}


   footer{
    /* border:2px solid orange; */
    text-align: center;
   }

   .footer-slogan{
    color: #928282;
   }
</style>
