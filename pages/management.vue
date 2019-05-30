<template>
  <div class="container">
    <div>
      <h3>user</h3>
      <div class="table-responsive">
        <table class="table" v-if="dataUser">
          <thead>
            <tr>
              <th>user Id</th>
              <th>user Name
                <span class="arrow" :class="sortUserBy == 'ASC' ? 'asc' : 'dsc'" @click="changeSortBy"></span>
              </th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataUser" v-bind:key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>
                <button type="button" class="btn btn-primary" @click="btnSelectUser(item.id, item.name)">select</button>
                <button v-if="dataUser.length > 1" type="button" class="btn btn-danger" @click="btnDeleteUser(item.id)">delete</button>
              </td>
            </tr>
            <tr>
              <td><input type="text" disabled v-model="modifyUserId" /></td>
              <td><input type="text" v-model="modifyUserName" /></td>
              <td>
                <button type="button" class="btn btn-success" @click="btnAddUser">new</button>
                <button type="button" class="btn btn-secondary" @click="btnUpadateUser">change</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h3>item</h3>
      <div class="table-responsive">
        <table class="table" v-if="dataItem">
          <thead>
            <tr>
              <th>item Id</th>
              <th>item Name
                <span class="arrow" :class="sortItemBy == 'ASC' ? 'asc' : 'dsc'" @click="changeItemSortBy"></span>
              </th>
              <th>user Id</th>
              <th>image</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataItem" v-bind:key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.user_id}}</td>
              <td v-if="item.image_path"><img :src="item.image_path"></td>
              <td>
                <button type="button" class="btn btn-primary" @click="btnSelectItem(item.id, item.name, item.user_id, item.image_path)">select</button>
                <button v-if="dataItem.length > 1" type="button" class="btn btn-danger" @click="btnDeleteItem(item.id)">delete</button>
              </td>
            </tr>
            <tr>
              <td><input type="text" disabled v-model="modifyItemId" /></td>
              <td><input type="text" v-model="modifyItemName" /></td>
              <td>
                <select v-model="modifyItemUserId">
                  <option v-for="item in dataUser" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option>
                </select>
              </td>
              <td><input type="text" v-model="modifyItemImagePath" /></td>
              <td>
                <button type="button" class="btn btn-success" @click="btnAddItem">new</button>
                <button type="button" class="btn btn-secondary" @click="btnUpadateItem">change</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      dataUser: [],
      dataItem: [],
      isUserChanged: false,
      isItemChanged: false,
      modifyUserId: '',
      modifyUserName: '',
      modifyItemId: '',
      modifyItemName: '',
      modifyItemUserId: '',
      modifyItemImagePath: '',
      sortUserBy: 'ASC',
      sortItemBy: 'ASC',
    }
  },
  watch: {
    isUserChanged: 'getUserData',
    sortUserBy: 'getUserData',
    sortItemBy: 'getItemData',
  },
  methods:{
      getUserData(){
        axios.get('http://localhost:3000/api/getUsersAll', {
          params: {
            sort: this.sortUserBy,
          }
        })
        .then((response) => {
          this.dataUser = response.data;
          this.isUserChanged = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getItemData(){
        axios.get('http://localhost:3000/api/getItemsAll', {
          sort: this.sortItemBy,
        })
        .then((response) => {
          this.dataItem = response.data;
          this.isItemChanged = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      btnAddUser(){
        if(this.modifyUserName){
          axios.post('http://localhost:3000/api/addUser', {
              name: this.modifyUserName,
            })
            .then(function (response) {
              console.log(response);
              this.isUserChanged = true;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      btnSelectUser(id, name){
        this.modifyUserId = id;
        this.modifyUserName = name;
      },
      btnUpadateUser(){
        if(this.modifyUserId && this.modifyUserName){
          axios.patch('http://localhost:3000/api/updateUser', {
            id: this.modifyUserId,
            name: this.modifyUserName,
          })
          .then(function (response) {
            console.log(response);
            this.isUserChanged = true;
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      btnDeleteUser(id){
        if(id) {
          axios.delete(`http://localhost:3000/api/deleteUser/${id}`)
            .then(function (response) {
              console.log(response);
              this.isUserChanged = true;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      btnSelectItem(id, name, userId, imagePath){
        this.modifyItemId = id;
        this.modifyItemName = name;
        this.modifyItemUserId = userId;
        this.modifyItemImagePath = imagePath;
      },
      btnAddItem(){
        if(this.modifyItemName && this.modifyItemUserId && this.modifyItemImagePath){
          axios.post('http://localhost:3000/api/addItem', {
              name: this.modifyItemName,
              userId: this.modifyItemUserId,
              imagePath: this.modifyItemImagePath,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      btnUpadateItem(){
        if(this.modifyItemId && this.modifyItemName && this.modifyItemUserId && this.modifyItemImagePath){
          axios.patch('http://localhost:3000/api/updateItem', {
            id: this.modifyItemId,
            name: this.modifyItemName,
            userId: this.modifyItemUserId,
            imagePath: this.modifyItemImagePath,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      btnDeleteItem(id){
        if(id) {
          axios.delete(`http://localhost:3000/api/deleteItem/${id}`)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      changeSortBy(){
        if( this.sortUserBy == 'ASC' ){
          this.sortUserBy = 'DESC';
        }
        else{
          this.sortUserBy = 'ASC';
        }
      },
      changeItemSortBy(){
        if( this.sortItemBy == 'ASC' ){
          this.sortItemBy = 'DESC';
        }
        else{
          this.sortItemBy = 'ASC';
        }
      }
  },
  created() {
    this.getUserData();
    this.getItemData();
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: inline;
}
.title {
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 42px;
}

/* table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
 */
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid rgb(250, 1, 1);
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgb(0, 38, 255);
}
</style>