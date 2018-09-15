<template>
  <div v-if="userInfo">
    <div class="top-bar relative margin-top">
        <span class="block-decorator"/>
        <h1>{{ userInfo.username }}</h1>

        <!-- Description -->
        <!-- <div if="{ !isEditting.description && userinfo }"> -->
        <!--     <p> -->
        <!--         { description } -->
        <!--         <div if="{ checkIsUser() && edittingNone() }"> -->
        <!--             <a onclick="{ openEdit.bind(this, 'description') }">editar</a> -->
        <!--         </div> -->
        <!--     </p> -->
        <!-- </div> -->

        <!-- Edit Description -->
        <!-- <form class="form" if="{ isEditting.description }"> -->
        <!--     <div class="form-group"> -->
        <!--         <label class="sr-only" -->
        <!--                for="user-edit-description"> -->
        <!--             { t('Description') } -->
        <!--         </label> -->
        <!--         <textarea class="form-control" -->
        <!--                   rows="3" -->
        <!--                   id="user-edit-description" -->
        <!--                   maxlength="500" -->
        <!--                   value="{ userinfo.description }" -->
        <!--                   placeholder="{ t('Description') }"/> -->
        <!--         <div class="control-buttons"> -->
        <!--             <button type="submit" -->
        <!--                     onclick="{ sendEdit }" -->
        <!--                     class="btn btn-color-sec"> -->
        <!--                 { t('Save') } -->
        <!--                 <span if="{ sendEditUserinfoWaiting }" class="loading"/> -->
        <!--             </button> -->
        <!--             <button class="btn btn-warning" -->
        <!--                     onclick="{ closeEdit.bind(this, 'description') }"> -->
        <!--                 { t('Cancel') } -->
        <!--             </button> -->
        <!--         </div> -->
        <!--     </div> -->
        <!-- </form> -->
    </div>

    <div class="top-bar bottom-bar private-info"
         if="{ checkIsUser() }">

        <p>{ t('private_data') }:</p>

        <!-- Email -->
        <div if="{ !isEditting.email }">
            <b>{ t('Email') }:</b> {userinfo.email}
            <a if="{ edittingNone() }"
               onclick="{ openEdit.bind(this, 'email') }">{ t('editar') }</a>
        </div>

        <!-- Edit Email -->
        <div if="{ isEditting.email }">
            <div class="form-group form">
                <label class="sr-only"
                        for="user-edit-email">
                    { t('E-mail') }
                </label>
                <input type="text"
                       class="form-control"
                       id="user-edit-email"
                       value="{ userinfo.email }"
                       placeholder="{ t('E-mail') }">
                <div class="control-buttons">
                    <button type="submit"
                            onclick="{ sendEdit }"
                            class="btn btn-color-sec">
                        { t('Save') }
                        <span if="{ sendEditUserinfoWaiting }" class="loading"/>
                    </button>
                    <button class="btn btn-color-sec"
                            onclick="{ closeEdit.bind(this, 'email') }">
                        { t('Cancel') }
                    </button>
                </div>
            </div>
        </div>

        <!-- Password -->
        <div if="{ !isEditting.password }">
            <b>{ t('Password') }</b>
            <a if="{ edittingNone() }"
               onclick="{ openEdit.bind(this, 'password') }">{ t('editar') }</a>
        </div>

        <!-- Edit Password -->
        <div if="{ isEditting.password }">
            <form class="form pessoa-edit-password-form">
                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-curr-password">
                        { t('Current password') }
                    </label>
                    <input type="password"
                        class="form-control { checkFieldError('password') }"
                        id="user-edit-curr-password"
                        placeholder="{ t('Current password') }">
                </div>

                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-new-password">
                        { t('New password') }
                    </label>
                    <input type="password"
                            class="form-control { checkFieldError('new_password') }"
                            id="user-edit-new-password"
                            placeholder="{ t('New password') }">
                </div>

                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-confirm-password">
                        { t("Confirm new password") }
                    </label>
                    <input type="password"
                            class="form-control { checkFieldError('confirm-password') }"
                            id="user-edit-confirm-password"
                            placeholder="{ t('Confirm new password') }">
                </div>

                <button type="submit"
                        onclick="{ sendEdit }"
                        class="btn btn-color-sec">
                    { t('Save') }
                    <span if="{ sendEditUserinfoWaiting }" class="loading"/>
                </button>
                <button class="btn btn-warning"
                        onclick="{ closeEdit.bind(this, 'password') }">
                    { t('Cancel') }
                </button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-info',
  components: {
  },
  computed: mapState({
    userInfo: state => state.auth.userInfo
  }),
  methods: {
  }
}
</script>
