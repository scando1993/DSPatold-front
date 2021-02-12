<template>
  <div class="main-content">
    <breadcumb :page="'Email Template'" :folder="'Templates'" />
		<div class="d-flex flex-row">
			<b-button class="mx-3" variant="light" @click="$router.back()">Go back</b-button>
			<b-button class="mx-3" form="form-1" type="submit" variant="primary">Submit</b-button>
		</div>
    <div class="my-4"></div>

    <b-row>
      <b-col sm="12">
        <b-card>
          <b-container fluid>
            <b-form id="form-1" @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Template Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  required
                  placeholder="Template name"
                ></b-form-input>
              </b-form-group>

              <div class="mb-2">
                <button
                  class="btn btn-danger"
                  @click="$bvModal.show('importEmailModal')"
                >
                  Import Email
                </button>
              </div>

              <b-form-group
                id="input-group-2"
                label="Subject:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.subject"
                  placeholder="subject"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <div class="mt-3">
                  <b-tabs>
                    <b-tab title="Text" active>
                      <div>
                        <b-form-textarea
                          id="textarea"
                          :state="textArea1State"
                          v-model="form.text"
                          placeholder="Enter something..."
                          rows="8"
                        ></b-form-textarea>
                      </div>
                    </b-tab>
                    <b-tab title="HTML">
                      <div class="example">
                        <quill-editor
                          class="editor"
                          ref="myQuillEditor"
                          v-model="form.html"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)"
                        />
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="form.tracking"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Add Tracking Image
                </b-form-checkbox>
              </b-form-group>
            </b-form>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
	metaInfo: {
		title: "Templates",
	},
	name: "template-show",
	data() {
		return {
			form: {
				id : 1,
				name : "Password Reset Template",
				subject : "{{.FirstName}}, please reset your password.",
				text : "Please reset your password here: {{.URL}}",
				html : "<html><head></head><body>Please reset your password <a href\"{{.URL}}\">here</a></body></html>",
				modified_date : "2016-11-21T18:30:11.1477736-06:00",
				attachments : [],
			},
			textArea1State: null,
			file: null,
			options: [5, 10, 20, 50],
			perPage: 5
		};
	},
	mounted() {
		const templateId = this.$route.params.id;

		api.templateId.get(templateId)
			.then(response => {
				this.form = response.data;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();

			this.show = false
			this.$nextTick(() => {
				this.show = false
			});

			let _this = this;
			
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will update this email template.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Update template",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.templateId.put(_this.form)
							.then(response => {
								resolve();
							})
							.catch(error => {
								const errorMsg = error.response.data.message;
								_this.$swal.close();
								_this.$swal.fire('Error!', errorMsg, 'error');
							})
					});
				}
			})
				.then(function (result) {
					if (result.value) {
						_this.$swal.fire(
							'Template edited successfully!',
							'This template has been edited successfully!',
							'success');
					}
				});
		},
		onReset(evt) {
			evt.preventDefault();
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorFocus() {},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		},
		onEditorBlur() {}
	}
};
</script>

<style scoped>
</style>
