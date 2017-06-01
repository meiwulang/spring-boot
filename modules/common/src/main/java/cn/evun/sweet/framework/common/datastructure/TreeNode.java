/*
 * Copyright 2015-2019 Evun Technology. 
 * 
 * This software is the confidential and proprietary information of
 * Evun Technology. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with evun.cn.
 */
package cn.evun.sweet.framework.common.datastructure;

import java.util.ArrayList;

/**
 * 树状结构对象的存储实现类
 *
 * @author yangw
 * @since 1.0.0
 */
public class TreeNode {

	private Long 	id;
	private String 	name;
	private Integer level; 		//当前层级
	private Boolean leaf = Boolean.TRUE;		//是否叶子节点
	private Long 	parentId;
	
	private ArrayList<TreeNode> childrens = new ArrayList<TreeNode>();
	private TreeNode parent;
	
	public TreeNode(Long id, String name) {
		setId(id);
		setName(name);
	}

	public TreeNode(Long id, String name, Boolean leaf) {
		setId(id);
		setName(name);
		setIsLeaf(leaf);
	}
	
	/**
	 * 添加一个孩子节点 
	 */
	public void addChild(TreeNode child){
		if(child == null || child.getId().longValue() == id.longValue()){
			return;
		}
		childrens.add(child);
		child.setParent(this);
		child.setParentId(this.id);
	}
	
	/**
	 * 删除一个孩子节点
	 */
	public void delChild(Long childId){
		if(childId == null || childId.longValue() == id.longValue()){
			return;
		}
		for(TreeNode node : childrens){
			if(node.getId().longValue() == childId.longValue()){
				childrens.remove(node);
				node.setParent(null);
				node = null;
				break;
			}else{
				node.delChild(childId);
			}
		}
	}
	
	/**
	 * 得到根节点
	 */
	public TreeNode getRoot() {
        if (getParent() == null) {
            return this;
        }else {
            return getParent().getRoot();
        }
    }
	
	/**
	 * 根据id查找节点
	 */
	public TreeNode findChild(Long nodeId) {
		if(nodeId == null){
			return null;
		}
		for(TreeNode node : childrens){
			if(node.getId().longValue() == nodeId.longValue()){
				return node;
			}else{
				TreeNode temp = node.findChild(nodeId);
				if(temp != null){
					return temp;
				}
			}
		}
		return null;
	}
	
	/**
	 * 从给定的节点开始向下遍历，并调用回调函数对每个节点进行操作。
	 */
	public void eachAllChild(TreeNode root, Callback callback){
		callback.excute(root);
		for(TreeNode node : root.getChildrens()){
			eachAllChild(node, callback);
		}
	}
		
    
   public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
	public Long getParentId() {
		return parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<TreeNode> getChildrens() {
		return childrens;
	}

	public void setChildrens(ArrayList<TreeNode> childrens) {
		this.childrens = childrens;
	}

	public TreeNode getParent() {
		return parent;
	}

	public void setParent(TreeNode parent) {
		this.parent = parent;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Boolean isLeaf() {
		return leaf;
	}

	public void setIsLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	/**
	 * 遍历树节点时使用的回调方法。可在遍历的过程中对节点进行操作。
	 *
	 * @author yangw
	 * @since 1.0.0
	 */
	public static interface Callback {  
        void excute(TreeNode node);    
    }
}
