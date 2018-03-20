<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class ImgController extends Controller {

    public function uploadAction(){

        $rm = $this->di->get("rm");
        try{
            if ($this->request->hasFiles() == true) {
                foreach ($this->request->getUploadedFiles() as $file) {
                    $this->file = $file;
//                    echo "上传文件名：".$file->getName()."<br />";
//                    echo "临时文件路径：".$file->getTempName()."<br />";
//                    echo "文件大小：".$file->getSize()."<br />";
//                    echo "文件类型：".$file->getType()."<br />";
//                    echo "错误代码：".$file->getError()."<br />";
//                    echo "上传表控件名：".$file->getKey()."<br />";
//                    echo "文件后綴".$file->getExtension()."<br />";

                    $fname = md5_file(getcwd()."/../app/upload-img/".$file->getName());
                    $res = $file->moveTo(getcwd()."/../app/upload-img/".$fname.".".$file->getExtension());

                    if($res){
                        $rm->setCode(1);
                        $rm->setMessage($fname);
                    }else{
                        $rm->setCode(0);
                        $rm->setMessage("上传失败");
                    }
                    break;
                }
            }else{

            }
        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }
        echo $rm->toJson();
    }

    public function upload2Action(){

        $rm = $this->di->get("rm");
        try{

            $img = $this->request->get("img");
            list($type, $data) = explode(',', $img);

            if(strstr($type,'image/jpeg')!=''){
                $ext = '.jpg';
            }elseif(strstr($type,'image/gif')!=''){
                $ext = '.gif';
            }elseif(strstr($type,'image/png')!=''){
                $ext = '.png';
            }

            $img_name = md5($data).$ext;
//            $img_name = str_replace("{" , "", $img_name);
//            $img_name = str_replace("}" , "", $img_name);
//            $img_name = strtolower(str_replace("-" , "", $img_name));


            $res = file_put_contents(getcwd()."/../app/upload-img/".$img_name, base64_decode($data), true);

            if($res){
                $rm->setCode(1);
                $rm->setMessage($img_name);
            }else{
                $rm->setCode(0);
                $rm->setMessage("上传失败");
            }

        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }finally{
            echo $rm->toJson();
        }
    }

    public function gAction(){

        $this->response->setHeader("Content-Type", "image/png");
        $img = $this->dispatcher->getParam("img");

        $imagespath = getcwd()."/../app/upload-img/".$img;
        echo file_get_contents($imagespath);
    }

}
