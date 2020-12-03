 <template>
  <div class="footer_wrap">
    <!-- Footer Start -->
    <div class="flex-grow-1"></div>
    <div class="app-footer">
      <div class="row">
        <div class="col-md-9">
          <p><strong>DPSat - Admin Dashboard Template</strong></p>
        </div>
      </div>
      <div
        class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center"
      >
        <div class="d-flex align-items-center">
          <img class="logo" src="@/assets/images/cropped-data-logo-pag.png" width="470" alt="" />
          <div>
            <div>
              <p class="m-0">&copy; 2020 Data Protect</p>
              <p class="m-0">All rights reserved</p>
            </div>
          </div>
          <span class="flex-grow-1"></span>
        </div>
      </div>
      <!-- fotter end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.app-footer .logo{
	width: 10rem;
}
</style>
