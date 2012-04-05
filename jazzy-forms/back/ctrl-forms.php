<?php

function jzzf_ctrl_forms() {
    if($_GET['diagnostics']) {
        jzzf_ctrl_diagnostics();
        return;
    } elseif($_POST['delete']) {
        if(jzzf_delete_form($_POST['delete'])) {
            $msg = "Form Deleted.";
        } else {
            $msg = "An error ocurred while deleting your form!";
        }
    } elseif($_POST['form']) {
        $json = stripcslashes($_POST['form']);
        $form = json_decode($json);
        if($current = jzzf_set_form($form)) {
            $msg = "Form Saved.";
        } else {
            $msg = "An error ocurred while saving your form!";
        }
    }
    $forms = jzzf_list_form();
    include('tpl-forms.php');
}

function jzzf_ctrl_diagnostics() {
    if($_POST['panic']) {
        jzzf_panic();
        return;
    } elseif($_POST['tweaks']) {
        update_option('jzzf_tweak_suppress_email', $_POST['tweak_suppress_email']);
        update_option('jzzf_log_level', $_POST['log_level']);
        update_option('jzzf_log_file', $_POST['log_file']);
    }
    $db_version = jzzf_get_version();
    $version = JZZF_VERSION;
    $forms = jzzf_list_form();
    $tweak_suppress_email = get_option('jzzf_tweak_suppress_email', false);
    $log_level = jzzf_log_level();
    $log_file = jzzf_log_file();
    include('tpl-diagnostics.php');
    return;
}