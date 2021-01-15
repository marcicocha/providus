<template>
  <div>
    <h1>Uploaded Documents</h1>
    <div class="columns is-multiline">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <img src="@/assets/images/reciept.png" alt="" />
            </div>
          </div>
          <footer class="card-footer">
            <p>Utility Bill</p>
            <div class="dropdown is-hoverable action-btn">
              <div class="dropdown-trigger">
                <i
                  class="custom-table-btn fas fa-ellipsis-v"
                  aria-controls="dropdown-menu"
                >
                </i>
              </div>
              <div id="dropdown-menu" class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    class="dropdown-item"
                    @click="toggleModal('UPDATE_MODE', record)"
                  >
                    <i class="fas fa-print" /> Print
                  </a>
                  <a
                    class="dropdown-item"
                    @click="toggleModal('DELETE_MODE', record)"
                  >
                    <i class="fa fa-eye" /> View
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <img src="@/assets/images/reciept.png" alt="" />
            </div>
          </div>
          <footer class="card-footer">
            <p>ID Card</p>
            <div class="dropdown is-hoverable action-btn">
              <div class="dropdown-trigger">
                <i
                  class="custom-table-btn fas fa-ellipsis-v"
                  aria-controls="dropdown-menu"
                >
                </i>
              </div>
              <div id="dropdown-menu" class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    class="dropdown-item"
                    @click="toggleModal('UPDATE_MODE', record)"
                  >
                    <i class="fas fa-print" /> Print
                  </a>
                  <a
                    class="dropdown-item"
                    @click="toggleModal('DELETE_MODE', record)"
                  >
                    <i class="fa fa-eye" /> View
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <img src="@/assets/images/reciept.png" alt="" />
            </div>
          </div>
          <footer class="card-footer">
            <p>Signature</p>
            <div class="dropdown is-hoverable action-btn">
              <div class="dropdown-trigger">
                <i
                  class="custom-table-btn fas fa-ellipsis-v"
                  aria-controls="dropdown-menu"
                >
                </i>
              </div>
              <div id="dropdown-menu" class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    class="dropdown-item"
                    @click="toggleModal('UPDATE_MODE', record)"
                  >
                    <i class="fas fa-pencil-alt" /> Print
                  </a>
                  <a
                    class="dropdown-item"
                    @click="toggleModal('DELETE_MODE', record)"
                  >
                    <i class="fa fa-eye" /> View
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <button class="print-btn">
      <i class="fa fa-print" style="padding: 10px"></i> Print BVN Information
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppUploadedDocumentComponent',
}
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 35px;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
}
.print-btn {
  background: transparent;
  border: none;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  margin-top: 25px;
}
.card {
  background: white;
  border: 0.5px solid #ddddddcb;
  .card-content {
    padding: 10px;
    overflow: hidden;
    text-align: center;
    border-bottom: 0.5px solid #ddddddcb;
  }
  .card-footer {
    display: flex;
    width: 100%;
    padding: 15px 15px;
    p {
      width: 95%;
    }
    .action-btn {
      width: 5%;
    }
  }
}
i {
  padding: 0px 10px;
}
</style>
